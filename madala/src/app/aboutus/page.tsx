import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import aboutUsImg from "../../../public/about-us.jpg";
import logoImg from "../../../public/logo.jpg";

export default function AboutUsPage() {
  return (
    <main>
      <div className="px-4 md:px-20 py-10 bg-white">
        
        <Breadcrumb current="Về chúng tôi" />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">VỀ CHÚNG TÔI</h1>

        <div className="flex flex-col md:flex-row items-start gap-6">
          
          <div className="flex-shrink-0 w-full md:w-1/2">
            <Image
              src={aboutUsImg}
              alt="Giới thiệu"
              className="rounded-md w-full h-auto object-cover"
              priority
            />
          </div>

          
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <Image
                src={logoImg}
                alt="Mandala Logo"
                width={80}
                height={60}
                className="mr-2"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              GIỚI THIỆU CHUNG VỀ MỸ PHẨM HANDMADE MANDALA
            </h2>

            <p className="text-gray-600 text-justify leading-relaxed">
              Hi, chào các nàng ... sau khi nhiều lần lũi lũi hóa hơ thơm nay tớ quay lại hăm nóng cái Blog này vào một ngày đầu hè thiệt nóng bức, mà tình cờ xô nhau đã đâm Free để giải nhiệt...
              Hi, chào các nàng ... sau khi nhiều lần lũi lũi hóa hơ thơm nay tớ quay lại hăm nóng cái Blog này vào một ngày đầu hè thiệt nóng bức, mà tình cờ xô nhau đã đâm Free để giải nhiệt...
            </p>

            <Link href="#" className="inline-block mt-4 text-green-600 font-medium hover:underline">
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
