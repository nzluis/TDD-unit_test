const { Booking, Room } = require('./index')

const bookingTemplate = {name: 'Luis Navarro', email:'luisnavarro@example.com'}
const roomTemplate = { name: 'Single Bed', rate: 145, discount: 15}

describe('Room isOccupied()', () => {
    const room = new Room({...roomTemplate})
    const booking1 = new Booking({...bookingTemplate, checkin: '2024-01-01', checkout: '2024-01-02', room})
    room.bookings = [ booking1 ]
    test('available before', () => {
        expect(room.isOccupied('2024-01-01')).toBeTruthy()
    })
})