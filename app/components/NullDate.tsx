interface NullDataProps {
    title: string
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
    return (
        <div className="w-full h-[500px] flex items-center  justify-center text-xl">
            <p>{title}</p>
        </div>
    )
}

export default NullData
