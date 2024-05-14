

export default function HeaderPro({ leftTitle, rightTitle }) {
    return (
        <div className="h-[13vh] w-full flex justify-between items-center bg-gradient-to-r from-blue-800 via-gray-800 to-red-800 text-white">
            <div className="p-4">
                <span className="font-bold text-xl">{leftTitle}</span>
            </div>
            <div className="flex p-4 bg-gray-900 h-full w-[404px] items-center justify-between">
                <span className="font-medium text-sm">1-0</span>
                <span className="block font-light text-xs">Patch 14.3</span>
            </div>
            <div className="p-4">
                <span className="font-bold text-xl">{rightTitle}</span>
            </div>
        </div>
    );
}