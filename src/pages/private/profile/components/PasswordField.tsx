import { Eye, EyeOff, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PasswordFieldProps = {
	value: string;
	onChange: (value: string) => void;
};

export function PasswordField({ value, onChange }: PasswordFieldProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [visible, setVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);

	if (!isEditing) {
		return (
			<button
				type="button"
				onClick={() => setIsEditing(true)}
				className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
			>
				<div className="flex flex-col gap-1">
					<p className="text-[12px] font-bold text-[#1e4976]">Senha</p>
					<p className="text-[12px] tracking-widest text-[#5a7a9a]">••••••••</p>
				</div>
				<Pencil className="size-3.5 shrink-0 text-[#387ccd]" />
			</button>
		);
	}

	return (
		<div className="flex flex-col gap-1.5 px-3 py-3">
			<p className="text-[12px] font-bold text-[#1e4976]">Senha</p>
			<div className="relative">
				<input
					ref={inputRef}
					type={visible ? "text" : "password"}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onBlur={() => {
						if (!value) setIsEditing(false);
					}}
					placeholder="Nova senha"
					className="h-[30px] w-full rounded-lg border-[1.5px] border-[#387ccd]/80 bg-white pl-3 pr-8 text-[12px] text-[#1a1d23] outline-none placeholder:text-[#888]/60"
				/>
				<button
					type="button"
					onClick={() => setVisible((prev) => !prev)}
					aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
					className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#387ccd]"
				>
					{visible ? (
						<EyeOff className="size-3.5" />
					) : (
						<Eye className="size-3.5" />
					)}
				</button>
			</div>
		</div>
	);
}
