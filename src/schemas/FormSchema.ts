import * as z from "zod";

const phoneSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    const trimmed = val.trim();
    return trimmed === "" ? undefined : trimmed;
  }
  return val;
}, z.string().min(11, "Invalid phone number").optional());

export const FormSchema = z
  .object({
    "Applicant Name": z.string().trim().nonempty("This field is required"),
    "Date of business visit": z
      .string()
      .trim()
      .nonempty("This field is required"),
    "Date of home visit": z.string().trim().nonempty("This field is required"),
    "Type of Guarantor": z.string().trim().nonempty("This field is required"),
    "Last Name": z.string().trim().nonempty("This field is required"),
    "Middle Name": z.string().trim().nonempty("This field is required"),
    "First Name": z.string().trim().nonempty("This field is required"),
    "Date of Birth": z.string().trim().nonempty("This field is required"),
    Sex: z.string().trim().nonempty("This field is required"),
    "Relation with Client": z
      .string()
      .trim()
      .nonempty("This field is required"),
    "Type of ID": z.string().trim().nonempty("This field is required"),
    "ID Card Number": z.string().trim().nonempty("This field is required"),
    "Marital Status": z.string().trim().nonempty("This field is required"),
    "Spouse Name": z.string().trim().optional(),
    "Spouse Phone Number": z.string().trim().optional(),
    "House Address": z.string().trim().nonempty("This field is required"),
    "Residence Type": z.string().trim().nonempty("This field is required"),
    "First Phone Number": phoneSchema,
    "Second Phone Number": phoneSchema,
    "Business Name": z.string().trim().nonempty("This field is required"),
    "Business Address": z.string().trim().nonempty("This field is required"),
    "Business Address Age": z
      .string()
      .trim()
      .nonempty("This field is required"),
    "Business Activity": z.string().trim().nonempty("This field is required"),
    "Business Activity Age": z
      .string()
      .trim()
      .nonempty("This field is required"),
    "Business Premises": z.string().trim().nonempty("This field is required"),
    "Number of Employee": z.string().trim().nonempty("This field is required"),
    "Business Co-owned": z.string().trim().nonempty("This field is required"),
    "Number of Sales Point": z
      .string()
      .trim()
      .nonempty("This field is required"),
    Sales: z.string().trim().nonempty("This field is required"),
    "Cost of Sales": z.string().trim().nonempty("This field is required"),
    "Operational Expenses": z
      .string()
      .trim()
      .nonempty("This field is required"),
    "Other Income": z.string().trim().nonempty("This field is required"),
    "Family Expense": z.string().trim().nonempty("This field is required"),
    "Repayment Capacity": z.string().trim().nonempty("This field is required"),
    "Cash and Bank": z.string().trim().nonempty("This field is required"),
    Inventory: z.string().trim().nonempty("This field is required"),
    "Fixed Asset": z.string().trim().nonempty("This field is required"),
    "Total Asset": z.string().trim().nonempty("This field is required"),
    Liability: z.string().trim().nonempty("This field is required"),
    Equity: z.string().trim().nonempty("This field is required"),
    "Name of Company": z.string().trim().nonempty("This field is required"),
    "Company Address": z.string().trim().nonempty("This field is required"),
    Designation: z.string().trim().nonempty("This field is required"),
    "Department/Unit": z.string().trim().nonempty("This field is required"),
    "Work Phone Number": z
      .string()
      .trim()
      .nonempty("This field is required")
      .min(11, "Invalid phone number"),
    "Company Email": z
      .string()
      .trim()
      .nonempty("This field is required")
      .email("Invalid email"),
    "Years of Service": z.string().trim().nonempty("This field is required"),
    Probation: z.string().trim().nonempty("This field is required"),
    "Name of Supervisor": z.string().trim().nonempty("This field is required"),
    "Supervisor Phone Number": z
      .string()
      .trim()
      .nonempty("This field is required")
      .min(11, "Invalid phone number"),
    "Net Pay": z.string().trim().nonempty("This field is required"),
    "Signature Date": z.string().trim().nonempty("This field is required"),
  })
  .superRefine((data, ctx) => {
    if (data["Marital Status"] === "Married") {
      if (!data["Spouse Name"] || data["Spouse Name"].trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This is field is required",
          path: ["Spouse Name"],
        });
      }
      if (
        !data["Spouse Phone Number"] ||
        data["Spouse Phone Number"].trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required",
          path: ["Spouse Phone Number"],
        });
      } else if (data["Spouse Phone Number"].length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 11,
          inclusive: true,
          type: "string",
          message: "Invalid phone number",
          path: ["Spouse Phone Number"],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (!data["First Phone Number"] && !data["Second Phone Number"]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["First Phone Number"],
        message: "At least one phone number is required",
      });
    }
  });

export type FormValues = z.infer<typeof FormSchema>;
