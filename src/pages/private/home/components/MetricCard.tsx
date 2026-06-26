type MetricCardProps = {
	iconBg: string;
	icon: React.ReactNode;
	value: string;
	valueColor: string;
	label: string;
	sublabel: string;
};

export function MetricCard({ iconBg, icon, value, valueColor, label, sublabel }: MetricCardProps) {
    return (
        <div className="bg-white border border-[#e5ebf3] flex flex-col gap-2 items-start p-6 rounded-[20px] w-full shadow-[0px_10px_14px_rgba(10,38,77,0.05)]">
            <div className={`${iconBg} flex items-center justify-center rounded-2xl size-14 shrink-0`}>
                {icon}
            </div>
            <p className={`font-extrabold text-[40px] leading-none ${valueColor}`}>{value}</p>
            <div className="flex flex-col gap-1">
                <p className="font-semibold text-[#0e2a45] text-[18px]">{label}</p>
                <p className="font-normal text-[#33536f] text-[13px]">{sublabel}</p>
            </div>
        </div>
    );
}