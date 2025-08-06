import { useForm, type Resolver } from "react-hook-form";
import type { item } from "../../shared/types/item";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useItemStore from "@/shared/store/useStore";

const resolver: Resolver<item> = async (values) => {
  return {
    values: values.code ? values : {},
    errors: !values.code
      ? {
          code: {
            type: "required",
            message: "code is required",
          },
        }
      : {},
  };
};
const ProductRegistrationPage = () => {
  const { addItem } = useItemStore();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<item>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<item>({ resolver });
  const onSubmit = handleSubmit((data) => {
    setFormData(data);
    addItem(data);
    alert(`${data.name} saved successfully`);
    navigate("/");
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 p-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Add New Item
      </h3>
      <Input
        {...register("code")}
        type="text"
        placeholder="barcode"
        value={code || ""}
      />
      <Input {...register("name")} type="text" placeholder="name" />
      <Input
        {...register("description")}
        type="text"
        placeholder="description"
      />
      <Input {...register("price")} type="number" placeholder="price" />
      <Button
        variant={"outline"}
        className="bg-black text-white font-bold"
        // onClick={() => navigate("/")}
      >
        Save
      </Button>
    </form>
  );
};

export default ProductRegistrationPage;
