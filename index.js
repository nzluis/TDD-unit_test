class Room {

    constructor({name, rate, discount}) {
        this.name = name
        this.bookings = []
        this.discount = discount
        this.rate = rate * (1 - this.discount/100) * 100
    }

    isOccupied(date) {
        let isDateInsideRange = false
        for (let i = 0; i < this.bookings.length ; i++) {
            if (date >= this.bookings[i].checkin && date < this.bookings[i].checkout) isDateInsideRange = true
        }
        return isDateInsideRange
    }   

    occupancyPercentage(startDate, endDate) {

    }

    totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    availableRooms(rooms, startDate, endDate) {

    }
}

class Booking {
    constructor({name, email, checkin, checkout, discount}) {
        this.name = name
        this.email = email
        this.checkin = checkin
        this.checkout = checkout
        this.discount = discount
        this.room = {}
    }

    getFee() {

    }
}

module.exports = {Room, Booking}