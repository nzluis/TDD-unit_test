class Room {

    constructor(name, rate, discount) {
        this.name = name
        this.bookings = []
        this.rate = rate
        this.discount = discount
    }
    
    isOccupied(date) {
        if(date)
    }

    occupancyPercentage(startDate, endDate) {

    }

    totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    availableRooms(rooms, startDate, endDate) {

    }
}

class Booking {
    constructor(name, email, checkin, checkout, discount) {
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