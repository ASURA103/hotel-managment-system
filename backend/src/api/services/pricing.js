const DAY_MS = 1000 * 60 * 60 * 24

// Same formula the booking page shows (frontend/src/Model/Book.jsx, calculateBill):
// a same-day stay costs price × rooms; otherwise nights × price × rooms.
export function computeBill(price, rooms, fromDate, toDate) {
    const days = (toDate - fromDate) / DAY_MS
    return days === 0 ? price * rooms : days * price * rooms
}
