
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
        const rangeDates = getDatesInRange(startDate, endDate)
        let occupiedDays = 0
        rangeDates.map(date => this.isOccupied(date)).forEach(date => {
            if (date) occupiedDays++
        })
        return Math.trunc((occupiedDays / rangeDates.length) *100)
    }

    totalOccupancyPercentage(rooms, startDate, endDate) {
        const percentages = rooms.map( room => room.occupancyPercentage(startDate, endDate))
        return Math.trunc(percentages.reduce( (sum, percentage) =>  {
            return sum + percentage
        }, 0) /percentages.length)
    }

    availableRooms(rooms, startDate, endDate) {
        const rangeQueryDates = getDatesInRange(startDate, endDate)
        const isAvailableRoom = rooms.map(room => {
            if (rangeQueryDates.some(date => room.isOccupied(date))) return false
            return {...room}
        })
        return isAvailableRoom.filter(room => room !== false)

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

function getDatesInRange(startDate, endDate) {
    const start = new Date(new Date(startDate))
    const end = new Date(new Date(endDate))
    
 const date = new Date(start.getTime())

 const dates = [];

 while (date <= end) {
  dates.push(new Date(date).toISOString().slice(0,10));
  date.setDate(date.getDate() + 1);
 }

 return dates;
}

module.exports = {Room, Booking}