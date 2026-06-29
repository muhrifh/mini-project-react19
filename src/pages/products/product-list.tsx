import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProductStore } from "@/stores/product-store";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const {
    products,
    isLoading,
    searchQuery,
    total,
    limit,
    fetchProducts,
    searchProducts,
    setSearchQuery,
    setPage,
    deleteProduct,
  } = useProductStore();

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setPage(currentPage);
    const skip = (currentPage - 1) * limit;
    fetchProducts(limit, skip);
  }, [fetchProducts, currentPage, limit, setPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(localSearch);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      toast.success("Product deleted successfully");
      setDeleteId(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        subtitle="Manage your product inventory"
        actions={
          <Button>
            <Link to="/products/add">Add Product</Link>
          </Button>
        }
      />

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
        {searchQuery && (
          <Button
            variant="outline"
            onClick={() => {
              setLocalSearch("");
              setSearchQuery("");
              fetchProducts();
            }}
          >
            Clear
          </Button>
        )}
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-48 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && products.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="max-h-73 overflow-hidden border-b">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">${product.price}</span>
                  <span className="text-sm text-muted-foreground">
                    Stock: {product.stock}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Link to={`/products/${product.id}`} className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Link to={`/products/${product.id}/edit`} className="flex items-center">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {searchQuery
              ? `No products found for "${searchQuery}"`
              : "No products available"}
          </p>
        </Card>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      {!isLoading && products.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, total)} of {total} products
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .reduce<(number | "...")[]>((acc, page, i, arr) => {
                if (i > 0 && page - (arr[i - 1] as number) > 1) {
                  acc.push("...");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((page, i) =>
                page === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1 text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </Button>
                )
              )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
