"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { getTrackingMeta, track, trackGoal } from "@/lib/analytics";
import { leadDirections, leadIntents } from "@/lib/site-data";
import { submitToWeb3Forms } from "@/lib/web3forms-client";

type LeadValues = {
  name: string;
  email: string;
  phone: string;
  intent: string;
  direction: string;
  context: string;
  consent: boolean;
  website: string;
};

const initialValues: LeadValues = {
  name: "",
  email: "",
  phone: "",
  intent: leadIntents[0],
  direction: "",
  context: "",
  consent: false,
  website: "",
};

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
  const [values, setValues] = useState<LeadValues>(() => ({
    ...initialValues,
    intent: initialIntent ?? initialValues.intent,
  }));
  // Если интент пришёл извне и его нет в стандартном списке — добавим его как
  // первый пункт, чтобы пользователь видел, на какую услугу/продукт он подаёт заявку.
  const intentOptions: string[] = (() => {
    const base: string[] = [...leadIntents];
    if (initialIntent && !base.includes(initialIntent)) {
      return [initialIntent, ...base];
    }
    return base;
  })();
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

  const validate = () => {
    const next: Partial<Record<keyof LeadValues, string>> = {};
    if (values.name.trim().length < 2) next.name = "Укажите имя";
    if (!values.email && !values.phone) {
      next.phone = "Укажите телефон, мессенджер или email";
    }
    if (values.email) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
      if (!ok) next.email = "Проверьте email";
    }
    if (!values.intent) next.intent = "Выберите цель обращения";
    if (!values.direction) next.direction = "Выберите направление";
    if (values.context.length > 1500) {
      next.context = "Максимум 1500 символов";
    }
    if (!values.consent) next.consent = "Нужно согласие";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const meta = getTrackingMeta();
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        intent: values.intent,
        companyType: values.direction,
        context: values.context,
        consent: values.consent,
        website: values.website,
        ...meta,
      };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      // Серверная валидация прошла → отправляем на Web3Forms напрямую с клиента
      // (Free-план Web3Forms работает только из браузера). Ошибки здесь не
      // ломают UX: серверный канал уже залогировал заявку и Telegram/CRM
      // (если настроены) тоже отработали.
      const w3f = await submitToWeb3Forms({
        name: values.name,
        email: values.email,
        phone: values.phone,
        intent: values.intent,
        companyType: values.direction,
        context: values.context,
        sourcePath:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        website: values.website,
      });
      const delivered = (data?.delivered ?? false) || w3f.ok;
      track("lead_submit_success", { delivered });
      trackGoal("form_submit", {
        delivered,
        variant,
        intent: values.intent ?? "",
      });
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
        submit();
      }}
      className="space-y-6"
      noValidate
    >
      <fieldset className="space-y-5">
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
            label="Email"
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

        <ChipsGroup
          label="Цель обращения"
          name="intent"
          value={values.intent}
          options={intentOptions}
          error={errors.intent}
          required
          onChange={(v) => setField("intent", v)}
        />

        <ChipsGroup
          label="Направление"
          name="direction"
          value={values.direction}
          options={[...leadDirections]}
          error={errors.direction}
          required
          onChange={(v) => setField("direction", v)}
        />

        <TextareaField
          label="Кратко о задаче (по желанию)"
          name="context"
          value={values.context}
          onChange={(v) => setField("context", v)}
          error={errors.context}
          placeholder="Например: нужен ИИ-ассистент на сайт + интеграция с AmoCRM"
        />
      </fieldset>

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

      {serverError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          Заявка приходит напрямую команде ИИМПАКТ ПЛЮС. Не передаём данные
          третьим лицам без согласия.
        </p>
        <button
          type="submit"
          className="btn-primary self-stretch sm:self-auto"
          disabled={submitting}
        >
          {submitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-5 w-5" />
          )}
          Отправить заявку
        </button>
      </div>
    </form>
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
      <h3 className="text-2xl font-bold text-heading">Заявка отправлена</h3>
      <p className="max-w-md text-pretty leading-7 text-body">
        Мы получили заявку и свяжемся в течение рабочего дня. Если задача
        срочная — напишите напрямую на{" "}
        <a className="font-bold text-primary" href="mailto:lids@aimpact.ru">
          lids@aimpact.ru
        </a>
        .
      </p>
    </motion.div>
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
        rows={3}
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

function ChipsGroup({
  label,
  name,
  value,
  options,
  error,
  required,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  error?: string;
  required?: boolean;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend className="field-label">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = o === value;
          return (
            <label
              key={o}
              className={cn(
                "flex max-w-full cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-left text-sm font-bold leading-snug transition",
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
