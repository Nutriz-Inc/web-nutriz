import { EnumDonationStepStatus } from "@/services/types/i-donation";

const badgeConfig: Record<EnumDonationStepStatus, { label: string; className: string }> = {
  [EnumDonationStepStatus.Pending]:   { label: "Pendente",   className: "bg-[#faeeda] text-[#854f0b]" },
  [EnumDonationStepStatus.Review]: { label: "Em análise", className: "bg-[#e1f5ee] text-[#0f6e56]" },
  [EnumDonationStepStatus.Failed]:  { label: "Erro",  className: "bg-[#fcebeb] text-[#a32d2d]" },
  [EnumDonationStepStatus.Done]:    { label: "Concluído",    className: "bg-[#e1f5ee] text-[#0f6e56]" },
  [EnumDonationStepStatus.Warn]:    { label: "Aviso",    className: "bg-[#fcebeb] text-[#a32d2d]" },
};

type StatusProps = {
  status: EnumDonationStepStatus;
};

export function Status({ status }: StatusProps) {
    const badge = badgeConfig[status];
return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold shrink-0 ${badge.className}`}>
          {badge.label}
        </span>
)
}