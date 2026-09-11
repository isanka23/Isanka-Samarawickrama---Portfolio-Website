import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SectionLabel } from "@/components/SectionLabel";
import { handleSpotlight } from "@/hooks/useSpotlight";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Tell me a little more (10+ characters)"),
  consent: z.literal(true, {
    message: "Permission is required to reply",
  }),
  // Honeypot — bots fill it, humans never see it.
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const awaiting = (value: string, placeholder: string) =>
  value?.trim() ? value : `[Awaiting ${placeholder}]`;

export function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "" },
  });

  const values = watch();

  const onSubmit = async (data: FormValues) => {
    // TODO: wire to Resend / Formspree. Stubbed so the UI is exercisable.
    await new Promise((r) => setTimeout(r, 900));
    console.info("contact payload", data);
    reset();
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-mist/60 focus:border-violet/60";

  return (
    <section id="contact" className="violet-wash relative px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">
        {/* Left — live payload preview */}
        <div>
          <SectionLabel>// Live Dispatch Node</SectionLabel>
          <h2 className="font-display text-chrome-gradient mt-6 text-[clamp(2rem,4.5vw,3.25rem)] uppercase">
            Let&apos;s Build Something Exceptional.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
            Fill out the transmission form or preview your live payload stream
            directly below.
          </p>

          <div onMouseMove={handleSpotlight} className="panel spotlight mt-9 rounded-2xl p-5">
            <p className="label-mono mb-4">// payload_preview.json</p>
            <pre className="overflow-x-auto font-mono text-[12.5px] leading-relaxed">
              <code>
                <span className="text-mist">{"{"}</span>
                {"\n  "}
                <span className="text-violet">"sender"</span>
                <span className="text-mist">: </span>
                <span className="text-chrome">
                  "{awaiting(`${values.firstName ?? ""} ${values.lastName ?? ""}`.trim(), "Name")}"
                </span>
                <span className="text-mist">,</span>
                {"\n  "}
                <span className="text-violet">"email"</span>
                <span className="text-mist">: </span>
                <span className="text-chrome">
                  "{awaiting(values.email ?? "", "Email")}"
                </span>
                <span className="text-mist">,</span>
                {"\n  "}
                <span className="text-violet">"message"</span>
                <span className="text-mist">: </span>
                <span className="text-chrome">
                  "{awaiting(values.message ?? "", "Message")}"
                </span>
                <span className="text-mist">,</span>
                {"\n  "}
                <span className="text-violet">"consent"</span>
                <span className="text-mist">: </span>
                <span className={values.consent ? "text-signal" : "text-mist"}>
                  {values.consent ? "true" : "false"}
                </span>
                {"\n"}
                <span className="text-mist">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onMouseMove={handleSpotlight}
          className="panel spotlight rounded-2xl p-6 md:p-8"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="label-mono mb-2 block">First Name</label>
              <input id="firstName" {...register("firstName")} className={field} placeholder="First name" />
              {errors.firstName && <p className="mt-1.5 text-xs text-red-400">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="label-mono mb-2 block">Last Name</label>
              <input id="lastName" {...register("lastName")} className={field} placeholder="Last name" />
              {errors.lastName && <p className="mt-1.5 text-xs text-red-400">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="label-mono mb-2 block">Email Address</label>
            <input id="email" type="email" {...register("email")} className={field} placeholder="you@company.com" />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="label-mono mb-2 block">Message</label>
            <textarea id="message" rows={5} {...register("message")} className={`${field} resize-none`} placeholder="Type your message here…" />
            {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
          </div>

          {/* Honeypot */}
          <input {...register("website")} tabIndex={-1} autoComplete="off" aria-hidden className="absolute h-0 w-0 opacity-0" />

          <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-mist">
            <input type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 shrink-0 accent-violet" />
            I give permission to contact me at this email address.
          </label>
          {errors.consent && <p className="mt-1.5 text-xs text-red-400">{errors.consent.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="shine mt-7 w-full rounded-full bg-chrome px-6 py-3.5 text-sm font-semibold text-void transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_-12px_rgb(255_255_255/0.35)] disabled:translate-y-0 disabled:opacity-55"
          >
            {isSubmitting ? "Transmitting…" : "Send Transmission"}
          </button>

          {isSubmitSuccessful && (
            <p className="mt-4 text-center font-mono text-xs text-signal" role="status">
              ✓ Transmission received. I&apos;ll reply shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
