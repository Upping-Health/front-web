import bcrypt from 'bcryptjs'


export const comparePassword = async (sendBody: string, passDb: string) =>
	await bcrypt.compare(sendBody, passDb)

export const generatePassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
