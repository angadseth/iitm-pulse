// Maps batch year + program code to default enrolled course IDs.
// IITM roll number format: YYpNNNNNNN  (e.g. 24f2004141)
// YY = batch year, p = program code (f = DS diploma track)
const CURRICULUM_MAP = {
  'diploma-ds': ['TDS', 'MLP', 'JAVA', 'MAD2', 'BDM'],
}

export function detectCourses(email) {
  const local = email.split('@')[0]           // e.g. "24f2004141"
  const programCode = local.charAt(2)?.toLowerCase()

  if (programCode === 'f') return CURRICULUM_MAP['diploma-ds']
  // Default: return all known courses if detection fails
  return CURRICULUM_MAP['diploma-ds']
}
