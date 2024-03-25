interface roomInterface {
    name: string;
    discount: number;
    rate: number
    bookings: Booking[]
}

class Room implements roomInterface {
    name: string
    discount: number
    rate: number
    bookings: Booking[]

    constructor({ name, rate, discount }: { name: string, rate: number, discount: number }) {
        this.name = name
        this.bookings = []
        this.discount = discount
        this.rate = rate
    }

    isOccupied(date) {
        for (let i = 0; i < this.bookings.length; i++) {
            if (date >= this.bookings[i].checkin && date < this.bookings[i].checkout) return true
        }
        return false
    }

    occupancyPercentage(startDate, endDate) {
        if (startDate > endDate) throw new Error('StartDate > EndDate')
        const rangeDates = getDatesInRange(startDate, endDate)
        let occupiedDays = 0
        rangeDates.map(date => this.isOccupied(date)).forEach(date => {
            if (date) occupiedDays++
        })
        return Math.floor((occupiedDays / rangeDates.length) * 100)
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        const percentages = rooms.map(room => room.occupancyPercentage(startDate, endDate))
        return Math.floor(percentages.reduce((sum, percentage) => {
            return sum + percentage
        }, 0) / percentages.length)
    }

    static availableRooms(rooms, startDate, endDate) {
        const rangeQueryDates = getDatesInRange(startDate, endDate)
        const availableRooms = rooms.map(room => {
            if (rangeQueryDates.some(date => room.isOccupied(date))) return false
            return { ...room }
        })
        return availableRooms.filter(room => room !== false)

    }
}

interface bookingInterface {
    name: string
    email: string
    checkin: string
    checkout: string
    discount: number
    room: Room
}

class Booking implements bookingInterface {
    name: string
    email: string
    checkin: string
    checkout: string
    discount: number
    room: Room

    constructor({ name, email, checkin, checkout, discount, room }: { name: string, email: string, checkin: string, checkout: string, discount: number, room: Room }) {
        this.name = name
        this.email = email
        this.checkin = checkin
        this.checkout = checkout
        this.discount = discount
        this.room = room
    }

    getFee() {
        const CONVERT_TO_CENTS = 100
        const roomFinalPricePerDay = this.room.rate * (1 - this.room.discount / 100) * CONVERT_TO_CENTS
        const bookingLength = getDatesInRange(this.checkin, this.checkout).length - 1;
        if (this.discount > 100 || this.room.discount > 100) throw new Error('Discount not allowed')
        return Math.round(roomFinalPricePerDay * bookingLength * (1 - this.discount / 100))
    }
}

function getDatesInRange(startDate, endDate) {
    const start = new Date(new Date(startDate))
    const end = new Date(new Date(endDate))

    const date = new Date(start.getTime())
    const dates: string[] = [];

    while (date <= end) {
        dates.push(new Date(date).toISOString().slice(0, 10));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

module.exports = { Room, Booking }