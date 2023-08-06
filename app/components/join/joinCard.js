import Image from "next/image";

function JoinCard(params) {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <Image 
                    alt="join"
                    className="hidden md:block cursor-pointer"
                    height="500"
                    width="1000"
                    src="/images/join.png"
                />
            </div>
        </div>
    );
}

export default JoinCard;