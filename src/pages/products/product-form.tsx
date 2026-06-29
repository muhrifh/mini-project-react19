import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import type { ProductFormData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/shared/back-button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    brand: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (isEditMode && id) {
      const fetchProduct = async () => {
        setIsFetching(true);
        try {
          const product = await api.getProduct(parseInt(id));
          setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            brand: product.brand || "",
            thumbnail: product.thumbnail,
          });
        } catch {
          toast.error("Product not found");
          navigate("/products");
        } finally {
          setIsFetching(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      if (isEditMode && id) {
        await api.updateProduct(parseInt(id), formData);
        toast.success("Product updated successfully");
      } else {
        await api.addProduct(formData);
        toast.success("Product added successfully");
      }
      navigate("/products");
    } catch {
      toast.error(isEditMode ? "Failed to update product" : "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <BackButton to="/products" />

      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="label-required">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Product title"
                className={cn(errors.title && "border-destructive")}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="label-required">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description"
                rows={4}
                className={cn(errors.description && "border-destructive")}
              />
              {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price" className="label-required">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={cn(errors.price && "border-destructive")}
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="stock" className="label-required">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className={cn(errors.stock && "border-destructive")}
                />
                {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="label-required">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., electronics"
                  className={cn(errors.category && "border-destructive")}
                />
                {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b border-b-white border-2 mr-2" />}
                {isLoading
                  ? "Saving..."
                  : isEditMode
                  ? "Update Product"
                  : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
