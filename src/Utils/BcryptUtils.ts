import bcrypt from 'bcrypt'

export default {
  encryptValue: async (value: string) => await bcrypt.genSalt(10).then((salt) => bcrypt.hash(value, salt)),
  compareValue: async (value: string, hashValue: string) => await bcrypt.compare(value, hashValue),
}
