import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to: string;
  children?: React.ReactNode;
}

export function BackButton({ to, children = "Back to Products" }: BackButtonProps) {
  return (
    <Button variant="ghost">
      <Link to={to} className="flex items-center">
        <ArrowLeft className="h-4 w-4 mr-2" /> {children}
      </Link>
    </Button>
  );
}
