"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { getTrackingMeta, track } from "@/lib/analytics";
import {
  companyTypes,
  leadChannels,
  leadIntents,
  leadTasks,
  leadTimelines,
} from "@/lib/site-data";

type LeadValues = {
  name: string;
  email: string;
  phone: string;
  intent: string;
  company: string;
  companyType: string;
  region: string;
  context: string;
  task: string;
  scale: string;
  timeline: string;
  channel: string;
  consent: boolean;
  website: string;
};

const initialValues: LeadValues = {
  name: "",
  email: "",
  phone: "",
  intent: leadIntents[0],
  company: "",
  companyType: "",
  region: "",
  context: "",
  task: "",
  scale: "",
  timeline: "",
  channel: "",
  consent: false,
  website: "",
};

const stepTitles = ["Контакты", "Компания", "Задача", "Подтверждение"] as const;

export function LeadForm({
  variant = "page",
  initialIntent,
  onSuccess,
}: {
  variant?: "page" | "modal";
  initialIntent?: string;
  onSuccess?: () => void;
}) {
  const formId = useId();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [values, setValues] = useState<LeadValues>(() => ({
    ...initialValues,
    intent:
      initialIntent &&
      (leadIntents as readonly string[]).includes(initialIntent)
        ? initialIntent
        : initialValues.intent,
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof LeadValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    track("lead_form_view", { variant });
  }, [variant]);

  const setField = <K extends keyof LeadValues>(key: K, value: LeadValues[K]) => {
    if (!started) {
      setStarted(true);
      track("lead_form_start", { variant });
    }
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (s: number) => {
    const next: Partial<Record<keyof LeadValues, string>> = {};
    if (s === 0) {
      if (values.name.trim().length < 2) next.name = "Укажите имя";
      if (!values.email && !values.phone)
        next.phone = "Email или телефон / мессенджер";
      if (values.email) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
        if (!ok) next.email = "Проверьте email";
      }
      if (!values.intent) next.intent = "Выберите цель обращения";
    }
    if (s === 1) {
      // company step is mostly optional; only context limit
      if (values.context.length > 2000) next.context = "Максимум 2000 символов";
    }
    if (s === 3) {
      if (!values.consent) next.consent = "Нужно согласие";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    if (step < 3) {
      const newStep = (step + 1) as 0 | 1 | 2 | 3;
      setStep(newStep);
      track(`lead_step_${(newStep + 1) as 1 | 2 | 3 | 4}`, { variant });
    }
  };

  const back = () => {
    if (step > 0) setStep(((step - 1) as 0 | 1 | 2 | 3));
  };

  const submit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const meta = getTrackingMeta();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...meta }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        track("lead_submit_error", { status: res.status });
        setServerError(
          data?.error === "validation"
            ? "Проверьте поля формы"
            : data?.error === "rate_limit"
              ? "Слишком много запросов, попробуйте через минуту"
              : "Не удалось отправить. Попробуйте позже или напишите на email.",
        );
        return;
      }
      track("lead_submit_success", { delivered: data?.delivered ?? false });
      setSuccess(true);
      onSuccess?.();
    } catch {
      track("lead_submit_error", { status: 0 });
      setServerError("Сеть недоступна. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <ThankYou variant={variant} />;
  }

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 3) submit();
        else next();
      }}
      className={cn(
        "space-y-6",
        variant === "modal" && "max-h-[80vh] overflow-y-auto pr-1",
      )}
      noValidate
    >
      <Progress step={step} />

      {step === 0 && <StepContacts values={values} errors={errors} setField={setField} />}
      {step === 1 && <StepCompany values={values} errors={errors} setField={setField} />}
      {step === 2 && <StepTask values={values} errors={errors} setField={setField} />}
      {step === 3 && <StepConfirm values={values} errors={errors} setField={setField} />}

      {/* Honeypot field — hidden from real users */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          Не заполняйте это поле
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </label>
      </div>

      {serverError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || submitting}
          className="btn-outline disabled:invisible"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад
        </button>
        {step < 3 ? (
          <button type="submit" className="btn-primary" disabled={submitting}>
            Продолжить
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
            Отправить заявку
          </button>
        )}
      </div>
    </form>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <ol
      className="flex items-center gap-2 text-xs font-bold"
      aria-label="Прогресс заполнения"
    >
      {stepTitles.map((title, i) => (
        <li key={title} className="flex flex-1 items-center gap-2">
          <span
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full border-2 text-[11px]",
              i < step
                ? "border-primary bg-primary text-white"
                : i === step
                  ? "border-primary text-primary"
                  : "border-blue-100 text-muted",
            )}
          >
            {i + 1}
          </span>
          <span
            className={cn(
              "hidden truncate uppercase tracking-[0.14em] sm:inline",
              i === step ? "text-primary" : "text-muted",
            )}
          >
            {title}
          </span>
          {i < stepTitles.length - 1 && (
            <span
              className={cn(
                "h-px flex-1",
                i < step ? "bg-primary" : "bg-blue-100",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

type StepProps = {
  values: LeadValues;
  errors: Partial<Record<keyof LeadValues, string>>;
  setField: <K extends keyof LeadValues>(key: K, value: LeadValues[K]) => void;
};

function StepContacts({ values, errors, setField }: StepProps) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-lg font-black text-heading">
        С чего начнём?
      </legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Имя"
          required
          name="name"
          value={values.name}
          onChange={(v) => setField("name", v)}
          error={errors.name}
          placeholder="Как к вам обращаться"
          autoComplete="name"
        />
        <Field
          label="Рабочий email"
          name="email"
          type="email"
          value={values.email}
          onChange={(v) => setField("email", v)}
          error={errors.email}
          placeholder="name@company.ru"
          autoComplete="email"
        />
        <Field
          label="Телефон / мессенджер"
          name="phone"
          value={values.phone}
          onChange={(v) => setField("phone", v)}
          error={errors.phone}
          placeholder="+7 …  или @username"
          autoComplete="tel"
        />
      </div>
      <RadioGroup
        label="Цель обращения"
        name="intent"
        value={values.intent}
        options={[...leadIntents]}
        error={errors.intent}
        onChange={(v) => setField("intent", v)}
      />
    </fieldset>
  );
}

function StepCompany({ values, errors, setField }: StepProps) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-lg font-black text-heading">
        Расскажите о компании
      </legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Название компании"
          name="company"
          value={values.company}
          onChange={(v) => setField("company", v)}
          error={errors.company}
          placeholder="Например, ООО «Турагентство»"
          autoComplete="organization"
        />
        <SelectField
          label="Тип компании"
          name="companyType"
          value={values.companyType}
          options={[...companyTypes]}
          onChange={(v) => setField("companyType", v)}
        />
        <Field
          label="Регион"
          name="region"
          value={values.region}
          onChange={(v) => setField("region", v)}
          error={errors.region}
          placeholder="Москва, Санкт-Петербург, Краснодар…"
        />
      </div>
      <TextareaField
        label="Контекст"
        name="context"
        value={values.context}
        onChange={(v) => setField("context", v)}
        error={errors.context}
        placeholder="Что хотите автоматизировать, какие каналы заявок, какие CRM/системы используете"
      />
    </fieldset>
  );
}

function StepTask({ values, errors, setField }: StepProps) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-lg font-black text-heading">
        Какую задачу решаем
      </legend>
      <RadioGroup
        label="Основная задача"
        name="task"
        value={values.task}
        options={[...leadTasks]}
        error={errors.task}
        onChange={(v) => setField("task", v)}
      />
      <Field
        label="Масштаб"
        name="scale"
        value={values.scale}
        onChange={(v) => setField("scale", v)}
        error={errors.scale}
        placeholder="Например: 1 виджет на сайт + Tourvisor"
      />
      <RadioGroup
        label="Срок"
        name="timeline"
        value={values.timeline}
        options={[...leadTimelines]}
        onChange={(v) => setField("timeline", v)}
      />
      <RadioGroup
        label="Предпочтительный канал связи"
        name="channel"
        value={values.channel}
        options={[...leadChannels]}
        onChange={(v) => setField("channel", v)}
      />
    </fieldset>
  );
}

function StepConfirm({ values, errors, setField }: StepProps) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-lg font-black text-heading">
        Проверьте и подтвердите
      </legend>
      <div className="rounded-2xl border border-blue-100 bg-surface-alt p-5 text-sm leading-7 text-body">
        <Summary label="Имя" value={values.name} />
        <Summary label="Email" value={values.email || "—"} />
        <Summary label="Телефон / мессенджер" value={values.phone || "—"} />
        <Summary label="Цель" value={values.intent} />
        <Summary label="Компания" value={values.company || "—"} />
        <Summary label="Тип" value={values.companyType || "—"} />
        <Summary label="Регион" value={values.region || "—"} />
        <Summary label="Задача" value={values.task || "—"} />
        <Summary label="Масштаб" value={values.scale || "—"} />
        <Summary label="Срок" value={values.timeline || "—"} />
        <Summary label="Канал" value={values.channel || "—"} />
        {values.context && <Summary label="Контекст" value={values.context} />}
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setField("consent", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
          aria-describedby="consent-help"
          required
        />
        <span className="text-sm leading-6 text-body">
          Согласен с обработкой персональных данных по 152-ФЗ и{" "}
          <a className="font-bold text-primary" href="/privacy" target="_blank">
            политикой конфиденциальности
          </a>
          . Согласие можно отозвать в любой момент.
        </span>
      </label>
      {errors.consent && (
        <p
          id="consent-help"
          className="text-sm font-semibold text-red-600"
          role="alert"
        >
          {errors.consent}
        </p>
      )}
      <p className="flex items-start gap-2 text-xs text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Заявка приходит напрямую команде ИИМПАКТ ПЛЮС. Мы не передаём данные
        третьим лицам без согласия.
      </p>
    </fieldset>
  );
}

function ThankYou({ variant }: { variant: "page" | "modal" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center gap-5 text-center",
        variant === "page" ? "py-10" : "py-6",
      )}
    >
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h3 className="text-2xl font-black text-heading">Заявка отправлена</h3>
      <p className="max-w-md text-pretty leading-7 text-body">
        Мы получили заявку и свяжемся в течение рабочего дня. Если задача
        срочная — напишите напрямую на{" "}
        <a className="font-bold text-primary" href="mailto:office@aimpact.ru">
          office@aimpact.ru
        </a>
        .
      </p>
    </motion.div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex flex-col sm:flex-row sm:gap-2">
      <span className="font-bold text-heading">{label}:</span>
      <span className="break-words text-body">{value}</span>
    </p>
  );
}

function Field({
  label,
  required,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  required?: boolean;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="field-label">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("field", error && "border-red-300")}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        required={required}
      />
      {error && (
        <span className="mt-1 block text-xs font-semibold text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className={cn("field", error && "border-red-300")}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {error && (
        <span className="mt-1 block text-xs font-semibold text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field"
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function RadioGroup({
  label,
  name,
  value,
  options,
  error,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend className="field-label">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = o === value;
          return (
            <label
              key={o}
              className={cn(
                "flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition",
                checked
                  ? "border-primary bg-primary text-white shadow-[var(--shadow-soft)]"
                  : "border-blue-100 bg-white text-body hover:border-primary hover:text-primary",
              )}
            >
              <input
                type="radio"
                name={`${name}-${id}`}
                value={o}
                checked={checked}
                onChange={() => onChange(o)}
                className="sr-only"
              />
              {o}
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>
      )}
    </fieldset>
  );
}
