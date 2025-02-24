import MiniHeader from "../components/MiniHeader";
import Condition from "../components/Condition";
import FormHeader from "../components/FormHeader";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/FormSchema";
import { Submit } from "../utils/Submit";
import { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { ImageDataType } from "../models/ImageDateType";
import { ToastContainer } from "react-toastify";

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: Record<string, string>) => {
    if (signatureError) {
      console.error("Cannot submit form:", signatureError);
      return;
    }
    Submit(data, signatureFile, reset, setIsLoading, setSignature);
  };

  function handleSignature(event: ChangeEvent<HTMLInputElement>) {
    setSignatureError("");
    setSignature(true);
    if (!event.target.files) return;
    setSignaturePic(URL.createObjectURL(event.target.files[0]));
    event.target.files[0];
    const name = event.target.name;
    const files = event.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise<ImageDataType>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            base64: reader.result?.toString().split(",")[1] || "",
            mimeType: file.type,
            name,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises)
      .then((images: ImageDataType[]) => {
        setSignatureFile(images);
        console.log(signatureFile);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(event.target.files[0].name);
  }

  function handleRemoveSignature() {
    console.log("removed");

    setSignature(false);
    setSignaturePic("");
  }

  function handleEnter() {
    setHover(true);
  }

  function handleLeave() {
    setHover(false);
  }

  const [signature, setSignature] = useState(false);
  const [signatureError, setSignatureError] = useState("no images");
  const [signatureFile, setSignatureFile] = useState<ImageDataType[]>([]);
  const [signaturePic, setSignaturePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className="border mx-auto md:p-5 py-5 overflow-auto h-screen relative">
      <div className="fixed top-0 left-0 text-center h-[150px] bg-white z-10 w-full shadow-md">
        <NavBar />
      </div>
      <div className="h-fit py-10 lg:w-[70%] w-full mx-auto mt-[120px] border-1 border-[#800] md:px-8 px-2 rounded-lg">
        <FormHeader title="GUARANTOR ASSESSMENT" />
        <form
          className="flex flex-col gap-3 mx-auto md:px-3 mt-3 inter"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="wrapper-custom">
            <label className="font-bold" htmlFor="applicant-name">
              Name of Applicant
            </label>
            <input
              {...register("Applicant Name")}
              className="input-custom"
              type="text"
              id="applicant-name"
              placeholder="Name"
            />
            {errors["Applicant Name"] && (
              <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                {errors["Applicant Name"].message}
              </p>
            )}
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-md-6">
              <label className="font-bold" htmlFor="business-visit">
                Date of business visit
              </label>
              <input
                {...register("Date of business visit")}
                name="Date of business visit"
                id="business-visit"
                className="input-custom"
                type="date"
              />
              {errors["Date of business visit"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Date of business visit"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-6">
              <label className="font-bold" htmlFor="home-visit">
                Date of home visit
              </label>
              <input
                {...register("Date of home visit")}
                name="Date of home visit"
                id="home-visit"
                className="input-custom"
                type="date"
              />
              {errors["Date of home visit"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Date of home visit"].message}
                </p>
              )}
            </div>
          </div>
          <div className="wrapper-custom">
            <label className="font-bold" htmlFor="t-o-g">
              Type of Guarantor
            </label>
            <select
              {...register("Type of Guarantor")}
              className="input-custom"
              name="Type of Guarantor"
              id="t-o-g"
              defaultValue=""
            >
              <option value="" className="bg-gray-300" selected>
                -- Select an option --
              </option>
              <option value="Business Owner">Business Owner</option>
              <option value="Employee">Employee</option>
            </select>
            {errors["Type of Guarantor"] && (
              <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                {errors["Type of Guarantor"].message}
              </p>
            )}
          </div>
          <MiniHeader title="INFORMATION ABOUT THE GUARANTOR" />
          <div className="row">
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="l-name">
                Last Name
              </label>
              <input
                {...register("Last Name")}
                name="Last Name"
                id="l-name"
                className="input-custom"
                type="text"
                placeholder="Last Name"
              />
              {errors["Last Name"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Last Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="m-name">
                Middle Name
              </label>
              <input
                {...register("Middle Name")}
                name="Middle Name"
                id="m-name"
                className="input-custom"
                type="text"
                placeholder="Middle Name"
              />
              {errors["Middle Name"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Middle Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="f-name">
                First Name
              </label>
              <input
                {...register("First Name")}
                name="First Name"
                id="f-name"
                className="input-custom"
                type="text"
                placeholder="First Name"
              />
              {errors["First Name"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["First Name"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="dob">
                Date of Birth
              </label>
              <input
                {...register("Date of Birth")}
                className="input-custom"
                name="Date of Birth"
                type="date"
                id="dob"
                placeholder="Date of Birth"
              />
              {errors["Date of Birth"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Date of Birth"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="sex">
                Sex
              </label>
              <select
                {...register("Sex")}
                className="input-custom"
                name="Sex"
                id="sex"
                defaultValue=""
              >
                <option className="bg-gray-300" value="" selected>
                  -- Sex --
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              {errors["Sex"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Sex"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="r-w-c" className="font-bold">
                Relation with Client
              </label>
              <input
                {...register("Relation with Client")}
                id="r-w-c"
                type="text"
                name="Relation with Client"
                placeholder="Relation with Client"
                className="input-custom"
              />
              {errors["Relation with Client"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Relation with Client"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="type-of-id">
                Type of ID
              </label>
              <input
                {...register("Type of ID")}
                type="text"
                name="Type of ID"
                placeholder="Type of ID"
                id="type-of-id"
                className="input-custom"
              />
              {errors["Type of ID"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Type of ID"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="id-card-num" className="font-bold">
                ID Card Number
              </label>
              <input
                {...register("ID Card Number")}
                type="text"
                name="ID Card Number"
                id="id-card-num"
                placeholder="ID Card Number"
                className="input-custom"
              />
              {errors["ID Card Number"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["ID Card Number"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="marital-status" className="font-bold">
                Marital Status
              </label>
              <select
                {...register("Marital Status")}
                name="Marital Status"
                id="marital-status"
                defaultValue=""
                className="input-custom"
              >
                <option className="bg-gray-300" value="" selected>
                  -- Select an option --
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Seperated">Seperated</option>
                <option value="Widow">Widow</option>
              </select>
              {errors["Marital Status"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Marital Status"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="spouse-name">
                Spouse Name
              </label>
              <input
                {...register("Spouse Name")}
                type="text"
                name="Spouse Name"
                placeholder="Spouse Name"
                id="spouse-name"
                className="input-custom"
              />
              {errors["Spouse Name"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Spouse Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="spouse-phone-num" className="font-bold">
                Spouse Phone Number
              </label>
              <input
                {...register("Spouse Phone Number")}
                type="tel"
                name="Spouse Phone Number"
                id="spouse-phone-num"
                placeholder="Spouse Phone Number"
                className="input-custom"
              />
              {errors["Spouse Phone Number"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Spouse Phone Number"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="home-address" className="font-bold">
                House Address
              </label>
              <input
                {...register("House Address")}
                type="text"
                name="House Address"
                id="home-address"
                placeholder="House Address"
                className="input-custom"
              />
              {errors["House Address"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["House Address"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-md-4">
              <label className="font-bold" htmlFor="residence-type">
                Residence Type
              </label>
              <select
                {...register("Residence Type")}
                name="Residence Type"
                id="residence-type"
                defaultValue=""
                className="input-custom"
              >
                <option value="" className="bg-gray-300" selected>
                  -- Select an option --
                </option>
                <option value="Owned">Owned</option>
                <option value="Rented">Rented</option>
                <option value="Family Owned">Family Owned</option>
              </select>
              {errors["Residence Type"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Residence Type"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="phone-num-1" className="font-bold">
                Phone Number 1
              </label>
              <input
                {...register("First Phone Number")}
                type="tel"
                name="First Phone Number"
                id="phone-num-1"
                placeholder="Phone Number 1"
                className="input-custom"
              />
              {errors["First Phone Number"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["First Phone Number"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-md-4">
              <label htmlFor="phone-num-2" className="font-bold">
                Phone Number 2
              </label>
              <input
                {...register("Second Phone Number")}
                type="tel"
                name="Second Phone Number"
                id="phone-num-2"
                placeholder="Phone Number 2"
                className="input-custom"
              />
              {errors["Second Phone Number"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Second Phone Number"].message}
                </p>
              )}
            </div>
          </div>
          <MiniHeader title="BUSINESS INFORMATION" />
          <div className="wrapper-custom">
            <label htmlFor="business-name" className="font-bold">
              Business Name
            </label>
            <input
              {...register("Business Name")}
              type="text"
              name="Business Name"
              placeholder="Business Name"
              id="business-name"
              className="input-custom"
            />
            {errors["Business Name"] && (
              <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                {errors["Business Name"].message}
              </p>
            )}
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="business-address" className="font-bold">
                Business Address
              </label>
              <input
                {...register("Business Address")}
                type="text"
                name="Business Address"
                id="business-address"
                placeholder="Business Address"
                className="input-custom"
              />
              {errors["Business Address"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Business Address"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="business-address-age" className="font-bold">
                Since
              </label>
              <input
                {...register("Business Address Age")}
                type="date"
                name="Business Address Age"
                id="business-address-age"
                placeholder="Business Address Age"
                className="input-custom"
              />
              {errors["Business Address Age"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Business Address Age"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="business-activity" className="font-bold">
                Business Activity
              </label>
              <input
                {...register("Business Activity")}
                type="text"
                name="Business Activity"
                id="business-activity"
                placeholder="Business Activity"
                className="input-custom"
              />
              {errors["Business Activity"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Business Activity"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="business-activity-age" className="font-bold">
                Since
              </label>
              <input
                {...register("Business Activity Age")}
                type="date"
                name="Business Activity Age"
                id="business-activity-age"
                placeholder="Business Activity Age"
                className="input-custom"
              />
              {errors["Business Activity Age"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Business Activity Age"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="business-premises" className="font-bold">
                Business Premises
              </label>
              <select
                {...register("Business Premises")}
                name="Business Premises"
                id="business-premises"
                defaultValue=""
                className="input-custom"
              >
                <option value="" selected className="text-gray-300">
                  -- Select an option --
                </option>
                <option value="Owned">Owned</option>
                <option value="Rented">Rented</option>
              </select>
              {errors["Business Premises"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Business Premises"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="number-of-employee" className="font-bold">
                Number of Employee
              </label>
              <input
                {...register("Number of Employee")}
                type="text"
                name="Number of Employee"
                id="number-of-employee"
                placeholder="Number of Employee"
                className="input-custom"
              />
              {errors["Number of Employee"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Number of Employee"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="business-co-owned" className="font-bold">
                Business Co-owned?
              </label>
              <select
                {...register("Business Co-owned")}
                name="Business Co-owned"
                id="business-co-owned"
                defaultValue=""
                className="input-custom"
              >
                <option value="" selected className="text-gray-300">
                  -- Select an option --
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors["Business Co-owned"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Business Co-owned"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="number-of-sales-point" className="font-bold">
                Number of Sales Point
              </label>
              <input
                {...register("Number of Sales Point")}
                type="text"
                name="Number of Sales Point"
                id="number-of-sales-point"
                placeholder="Number of Sales Point"
                className="input-custom"
              />
              {errors["Number of Sales Point"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Number of Sales Point"].message}
                </p>
              )}
            </div>
          </div>
          <MiniHeader title="MONTHLY CASHFLOW" />
          <div className="row">
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="sales" className="font-bold">
                Sales
              </label>
              <input
                {...register("Sales")}
                type="text"
                name="Sales"
                id="sales"
                placeholder="Sales"
                className="input-custom"
              />
              {errors["Sales"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Sales"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="cost-of-sales" className="font-bold">
                Cost of Sales
              </label>
              <input
                {...register("Cost of Sales")}
                type="text"
                name="Cost of Sales"
                id="cost-of-sales"
                placeholder="Cost of Sales"
                className="input-custom"
              />
              {errors["Cost of Sales"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Cost of Sales"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="operational-exp" className="font-bold">
                Operational Expenses
              </label>
              <input
                {...register("Operational Expenses")}
                type="text"
                name="Operational Expenses"
                id="operational-exp"
                placeholder="Operational Expenses"
                className="input-custom"
              />
              {errors["Operational Expenses"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Operational Expenses"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="other-income" className="font-bold">
                Other Income
              </label>
              <input
                {...register("Other Income")}
                type="text"
                name="Other Income"
                id="other-income"
                placeholder="Other Income"
                className="input-custom"
              />
              {errors["Other Income"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Other Income"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="family-expense" className="font-bold">
                Family Expense
              </label>
              <input
                {...register("Family Expense")}
                type="text"
                name="Family Expense"
                id="family-expense"
                placeholder="Family Expense"
                className="input-custom"
              />
              {errors["Family Expense"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Family Expense"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="repayment-capacity" className="font-bold">
                Repayment Capacity
              </label>
              <input
                {...register("Repayment Capacity")}
                type="text"
                name="Repayment Capacity"
                id="repayment-capacity"
                placeholder="Repayment Capacity"
                className="input-custom"
              />
              {errors["Repayment Capacity"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Repayment Capacity"].message}
                </p>
              )}
            </div>
          </div>
          <MiniHeader title="BALANCE SHEET" />
          <div className="row">
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="cash-and-bank" className="font-bold">
                Cash & Bank
              </label>
              <input
                {...register("Cash and Bank")}
                type="text"
                name="Cash and Bank"
                placeholder="Cash and Bank"
                id="cash-and-bank"
                className="input-custom"
              />
              {errors["Cash and Bank"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Cash and Bank"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="inventory" className="font-bold">
                Inventory
              </label>
              <input
                {...register("Inventory")}
                type="text"
                name="Inventory"
                placeholder="Inventory"
                id="inventory"
                className="input-custom"
              />
              {errors["Inventory"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Inventory"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="fixed-asset" className="font-bold">
                Fixed Asset
              </label>
              <input
                {...register("Fixed Asset")}
                type="text"
                name="Fixed Asset"
                placeholder="Fixed Asset"
                id="fixed-asset"
                className="input-custom"
              />
              {errors["Fixed Asset"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Fixed Asset"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="total-asset" className="font-bold">
                Total Asset
              </label>
              <input
                {...register("Total Asset")}
                type="text"
                name="Total Asset"
                placeholder="Total Asset"
                id="total-asset"
                className="input-custom"
              />
              {errors["Total Asset"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Total Asset"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="Liability" className="font-bold">
                Liability
              </label>
              <input
                {...register("Liability")}
                type="text"
                name="Liability"
                placeholder="Liability"
                id="Liability"
                className="input-custom"
              />
              {errors["Liability"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Liability"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-4 wrapper-custom">
              <label htmlFor="equity" className="font-bold">
                Equity
              </label>
              <input
                {...register("Equity")}
                type="text"
                name="Equity"
                placeholder="Equity"
                id="equity"
                className="input-custom"
              />
              {errors["Equity"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Equity"].message}
                </p>
              )}
            </div>
          </div>
          <MiniHeader title="ASSESSMENT OF EMPLOYMENT" />
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="name-of-company" className="font-bold">
                Name of Company
              </label>
              <input
                {...register("Name of Company")}
                type="text"
                name="Name of Company"
                placeholder="Name of Company"
                id="name-of-company"
                className="input-custom"
              />
              {errors["Name of Company"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Name of Company"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="company-address" className="font-bold">
                Address (Company)
              </label>
              <input
                {...register("Company Address")}
                type="text"
                name="Company Address"
                placeholder="Company Address"
                id="company-address"
                className="input-custom"
              />
              {errors["Company Address"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Company Address"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="designation" className="font-bold">
                Designation
              </label>
              <input
                {...register("Designation")}
                type="text"
                name="Designation"
                placeholder="Designation"
                id="designation"
                className="input-custom"
              />
              {errors["Designation"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Designation"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="dept" className="font-bold">
                Dept/Unit
              </label>
              <input
                {...register("Department/Unit")}
                type="text"
                name="Department/Unit"
                placeholder="Department/Unit"
                id="dept"
                className="input-custom"
              />
              {errors["Department/Unit"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Department/Unit"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="work-phone-num" className="font-bold">
                Work Phone Number
              </label>
              <input
                {...register("Work Phone Number")}
                type="tel"
                name="Work Phone Number"
                placeholder="Work Phone Number"
                id="work-phone-num"
                className="input-custom"
              />
              {errors["Work Phone Number"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Work Phone Number"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="email" className="font-bold">
                Email (Company)
              </label>
              <input
                {...register("Company Email")}
                type="email"
                name="Company Email"
                placeholder="Company Email"
                id="email"
                className="input-custom"
              />
              {errors["Company Email"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Company Email"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="years-of-service" className="font-bold">
                Years of Service
              </label>
              <input
                {...register("Years of Service")}
                type="text"
                name="Years of Service"
                placeholder="Years of Service"
                id="years-of-service"
                className="input-custom"
              />
              {errors["Years of Service"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Years of Service"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="probation" className="font-bold">
                Probation
              </label>
              <select
                {...register("Probation")}
                name="Probation"
                id="probation"
                defaultValue=""
                className="input-custom"
              >
                <option className="bg-gray-300" value="" selected>
                  -- Yes or No --
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors["Probation"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Probation"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="name-of-supervisor" className="font-bold">
                Name of Supervisor
              </label>
              <input
                {...register("Name of Supervisor")}
                type="text"
                name="Name of Supervisor"
                placeholder="Name of Supervisor"
                id="name-of-supervisor"
                className="input-custom"
              />
              {errors["Name of Supervisor"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Name of Supervisor"].message}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6 wrapper-custom">
              <label htmlFor="supervsior-num" className="font-bold">
                Supervsior Phone Number
              </label>
              <input
                {...register("Supervisor Phone Number")}
                type="tel"
                name="Supervisor Phone Number"
                placeholder="Supervisor Phone Number"
                id="supervsior-num"
                className="input-custom"
              />
              {errors["Supervisor Phone Number"] && (
                <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                  {errors["Supervisor Phone Number"].message}
                </p>
              )}
            </div>
          </div>
          <div className="wrapper-custom">
            <label htmlFor="net-pay" className="font-bold">
              Net Pay
            </label>
            <input
              {...register("Net Pay")}
              type="text"
              id="net-pay"
              name="Net Pay"
              placeholder="Net Pay"
              className="input-custom"
            />
            {errors["Net Pay"] && (
              <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                {errors["Net Pay"].message}
              </p>
            )}
          </div>
          <Condition />
          <div className="wrapper-custom">
            {!signature ? (
              <label
                className="w-[30%] h-60 border-dashed border-2 border-gray-700 d-flex text-center justify-center items-center hover:bg-slate-100 cursor-pointer shadow-md"
                htmlFor="signature"
              >
                <span>Signature</span>
              </label>
            ) : (
              <div
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className="relative w-[30%] h-60 bg-gray-200 shadow-md"
              >
                {hover && (
                  <button
                    onClick={handleRemoveSignature}
                    type="button"
                    className="text-white absolute top-2 bg-red-600 right-2 rounded-full"
                  >
                    <MdClose size="24" className="text-white" />
                  </button>
                )}

                <img
                  className="object-cover h-60"
                  width="100%"
                  src={signaturePic}
                  alt="signature"
                />
              </div>
            )}

            <input
              className="hidden"
              type="file"
              name="Signature"
              id="signature"
              accept="image/*"
              onChange={(e) => handleSignature(e)}
            />
            {/* {errors["Signature"] && (
              <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                {errors["Signature"].message}
              </p>
            )} */}
          </div>
          <div className="wrapper-custom">
            <label className="font-bold" htmlFor="signature-date">
              Date
            </label>
            <input
              {...register("Signature Date")}
              className="input-custom text-black w-[30%]"
              name="Signature Date"
              type="date"
              id="signature-date"
            />
            {errors["Signature Date"] && (
              <p className="p-0 m-0 absolute -bottom-4 text-xs text-[#f00]">
                {errors["Signature Date"].message}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#800] text-white py-[13px] rounded-pill w-full disabled:bg-[#db8686] hover:bg-[#700] text-center flex items-center justify-center"
          >
            {isLoading ? (
              <div className="h-7 w-7 border-2 border-t-transparent border-[#7b3434] rounded-full animate-spin"></div>
            ) : (
              <span className="text-xl rounded-full">Submit</span>
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
