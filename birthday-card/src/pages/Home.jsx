import { useNavigate } from "react-router-dom";
import CardFront from "../components/Card/CardFront";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#f5f5f5] flex items-center justify-center p-4">
      <CardFront onClick={() => navigate("/card-open")} />
    </div>
  );
}