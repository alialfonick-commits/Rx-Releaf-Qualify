export const examListSelect = {
  id: true,
  caseNumber: true,
  createdAt: true,
  updatedAt: true,
  consultationType: true,
  patientState: true,
  paymentStatus: true,
  examId: true,
  examName: true,
  isPhoneVisit: true,
  providerName: true,
  status: true,
  patient: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dob: true,
    },
  },
  staff: {
    select: {
      id: true,
      name: true,
    },
  },
}

export const paymentListSelect = {
  id: true,
  caseNumber: true,
  createdAt: true,
  updatedAt: true,
  paymentStatus: true,
  paymentId: true,
  paymentLink: true,
  status: true,
  consultationType: true,
  examName: true,
  patient: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
}
