import { Link } from '@inertiajs/react';
import logo from '../../assets/image/logo.png';
import hand from '../../assets/image/hand.png';


export default function GuestLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col w-full relative">
            <div
                className="absolute inset-y-0 right-[-60px] w-[600px] h-full bg-no-repeat bg-right"
                style={{
                    backgroundImage: `url(${hand})`,
                    backgroundSize: "contain", // or "cover" depending on your needs
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    zIndex: -1
                }}
            />

            <div className="relative flex p-4 gap-2 items-center z-10">
                <Link href="/" className="flex gap-2 items-center">
                    <div className="rounded-sm px-2 pt-1 bg-white">
                        <img className="w-full max-w-[20px] object-cover" src={logo} alt="Healthy Living" />
                    </div>
                    <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Nutrisafari</h1>
                </Link>
            </div>

            <div className="relative flex-1 max-w-[1280px] mx-auto w-full p-4  grid grid-cols-1 md:grid-cols-2 z-10">
                <div className="flex md:px-12 lg:px-16">{children}</div>
                <div className="relative">
                    <div className="absolute inset-0 "></div>
                    <p className="relative z-10"></p>
                </div>
            </div>
        </div>
    );
}
