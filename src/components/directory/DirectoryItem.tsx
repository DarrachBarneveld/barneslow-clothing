import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../lib/types";

interface DirectoryItemProps {
  category: Category;
}

const DirectoryItem: FunctionComponent<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <button
      className="flex h-[240px] min-w-[30%] flex-auto items-center justify-center overflow-hidden border border-black p-0 hover:cursor-pointer hover:opacity-25"
      onClick={onNavigateHandler}
    >
      <div
        className="h-full w-full bg-cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="p1 absolute flex h-[90px] flex-col items-center justify-center border border-black bg-white opacity-70">
        <h2 className="text-bold m-1 text-xl uppercase text-slate-800">
          {title}
        </h2>
        <p className="text-lg">Shop Now!</p>
      </div>
    </button>
  );
};

export default DirectoryItem;
