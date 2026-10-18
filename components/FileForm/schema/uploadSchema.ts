import { z } from "zod";

export const UploadFormSchema = z.object({
  receiverEmail: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address, such as name@example.com." })
    .optional()
    .or(z.literal("")),

  senderEmail: z
    .string()
    .email({ message: "Enter a valid email address, such as name@example.com." })
    .optional(),

  message: z.string().optional(),

  files: z.array(
    z.instanceof(File).refine((file) => file.size > 0, {
      message: "Select at least one non-empty file to transfer.",
    }),
  ),
});
