import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import ArrowRight from "@/../public/arrow-right.png";


export default function BodyLoadingSkeleton() {
  return (
    <tr className="hover:bg-[#FBFBFB]">
      <td className="py-2 px-6 flex items-center first:py-6">
        <Skeleton circle={true} height={32} width={32} className="mr-2" />
        <span>
          <Skeleton width={100} />
        </span>
      </td>
      <td className="py-2 px-6">
        <Skeleton width={150} />
      </td>
      <td className="py-2 px-6">
        <Skeleton width={150} />
      </td>
      <td className="py-2 px-6">
        <Image src={ArrowRight} alt="arrow right icon" />
      </td>
    </tr>
  );
}
