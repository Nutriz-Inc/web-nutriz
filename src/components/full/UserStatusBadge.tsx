import { cn } from "@/lib/utils";

type Props = {
    isActive: boolean;
};

export function UserStatusBadge({ isActive }: Props) {
    return (
        <span
            className={cn(
                "flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold",
                isActive
                    ? "bg-[#e1f1fb] text-[#00458b]"
                    : "bg-[#fcebec] text-[#d94b52]",
            )}
        >
            <span
                className={cn(
                    "size-1.5 rounded-full",
                    isActive ? "bg-[#00458b]" : "bg-[#d94b52]",
                )}
            />
            {isActive ? "Ativo" : "Inativo"}
        </span>
    );
}
