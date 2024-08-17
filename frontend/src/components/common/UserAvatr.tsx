import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

function UserAvatar({ image }: { image?: string }) {
  return (
    <div className="">
      {image ? (
        <Image
          src={getImageUrl(image)}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <Image
          src="/avatar.png"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default UserAvatar;
