import Image from "@/components/Image";

const MiniSabrina = () => {
    return (
        <div className="fixed bottom-[-5.7rem] opacity-20 duration-1200 ease-linear transition-all hover:bottom-0 hover:opacity-100 right-0 z-[99] hidden md:block">
            <Image
                src="https://example.com/my-site-assets/formats/gif/mini-sabrina-highres-transparent.gif"
                width={120}
                height={120}
                alt="Mini Sabrina"
                format="gif"
                useLQIP={false}
                useLoader={false}
                useBetterPic={false}
            />
        </div>
    )
};

export default MiniSabrina;