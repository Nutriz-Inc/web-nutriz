export type DonationStat = {
	value: string;
	label: string;
};

export const DONATION_STATS: DonationStat[] = [
	{ value: "1 litro", label: "alimenta até 10 bebês prematuros por dia" },
	{ value: "220+", label: "bancos de leite na rede rBLH pelo Brasil" },
	{ value: "15 dias", label: "validade do leite cru congelado" },
	{ value: "100%", label: "do leite doado é pasteurizado e testado" },
];
