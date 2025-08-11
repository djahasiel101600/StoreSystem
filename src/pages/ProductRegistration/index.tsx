import supabase from "@/shared/utils/supabase";

import { useForm, type Resolver, Controller } from "react-hook-form";
import type { item } from "../../shared/types/item";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useItemStore from "@/shared/store/useStore";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { category } from "@/shared/types/category";
import insertItem from "./transactions/insertItem";

const resolver: Resolver<item> = async (values) => {
  return {
    values: values.barcode ? values : {},
    errors: !values.barcode
      ? {
          barcode: {
            type: "required",
            message: "code is required",
          },
        }
      : {},
  };
};
const ProductRegistrationPage = () => {
  const [categories, setCategories] = useState<category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const { data, error } = await supabase.from("Category").select();
      setCategories(data as category[]);
      console.log(data);
    }
    getCategories();
  }, []);

  const { addItem } = useItemStore();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  // const [formData, setFormData] = useState<item>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<item>({ resolver });
  const onSubmit = handleSubmit((data) => {
    insertItem("product", data);
    // setFormData(data);
    addItem(data);
    alert(`${data.name} saved successfully`);
    navigate("/");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 p-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Add New Item
      </h3>
      <div className="flex flex-col gap-2">
        <Label>Barcode</Label>
        <Input
          {...register("barcode")}
          type="text"
          placeholder="barcode"
          value={code || ""}
        />
        {errors.barcode && (
          <p className="text-red-500 font-medium">{errors.barcode.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Product Name</Label>
        <Input {...register("name")} type="text" placeholder="Product name" />
        {errors.name && (
          <p className="text-red-500 font-medium">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Input
          {...register("description")}
          type="text"
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-500 font-medium">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Price</Label>
        <Input
          {...register("price", { valueAsNumber: true })}
          type="number"
          placeholder="0"
          defaultValue={0}
        />
        {errors.price && (
          <p className="text-red-500 font-medium">{errors.price.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Stock</Label>
        <Input
          {...register("stock", { valueAsNumber: true })}
          type="number"
          placeholder="0"
          defaultValue={0}
        />
        {errors.stock && (
          <p className="text-red-500 font-medium">{errors.stock.message}</p>
        )}
      </div>

      <hr />
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Label>Unit</Label>
          <Input {...register("unit")} type="text" placeholder="ex: pcs." />
          {errors.unit && (
            <p className="text-red-500 font-medium">{errors.unit.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Size</Label>
          <Input {...register("size")} type="text" placeholder="25 or small" />
          {errors.size && (
            <p className="text-red-500 font-medium">{errors.size.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Category</Label>
        <Controller
          name="productCategory"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((ctgry) => (
                  <SelectItem key={ctgry.id} value={String(ctgry.id)}>
                    {ctgry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.productCategory && (
          <p className="text-red-500 font-medium">
            {errors.productCategory.message}
          </p>
        )}
      </div>
      <Button variant={"outline"} className="bg-black text-white font-bold">
        Save
      </Button>
    </form>
  );
};

export default ProductRegistrationPage;
