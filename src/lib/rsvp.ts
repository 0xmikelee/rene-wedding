import { z } from "zod";

export const attendanceOptions = [
  { value: "yes", label: "Yes, will be there" },
  { value: "no", label: "Sorry, won’t make it" },
] as const;

export const menuOptions = [
  { value: "regular", label: "Regular Menu" },
  { value: "vegan", label: "Vegan" },
] as const;

export const rsvpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Please enter your first name.")
    .max(80, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Please enter your last name.")
    .max(80, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(160, "Email address is too long.")
    .email("Please enter a valid email address."),
  attending: z.enum(["yes", "no"], {
    error: "Please let us know if you can attend.",
  }),
  dietary: z
    .string()
    .trim()
    .min(1, "Please enter your allergies, or NA.")
    .max(500, "Please keep this under 500 characters."),
  menu: z.enum(["regular", "vegan"], {
    error: "Please choose a menu.",
  }),
  company: z.string().optional(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpField = keyof Omit<RsvpInput, "company">;

/** Maps a validated RSVP into the column order written to the sheet. */
export function toSheetRow(input: RsvpInput) {
  return {
    submittedAt: new Date().toISOString(),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    attending: input.attending === "yes" ? "Yes" : "No",
    dietary: input.dietary,
    menu: input.menu === "regular" ? "Regular Menu" : "Vegan",
  };
}
