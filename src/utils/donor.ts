type RecurrentDonorSource = {
	blood_exam_valid_until?: string;
};

export function isRecurrentDonor(source?: RecurrentDonorSource) {
	if (!source?.blood_exam_valid_until) {
		return false;
	}

	const validUntil = new Date(source.blood_exam_valid_until);

	return (
		!Number.isNaN(validUntil.getTime()) && validUntil.getTime() > Date.now()
	);
}
