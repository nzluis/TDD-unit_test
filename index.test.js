const { Booking, Room } = require('./index')

const bookingTemplate = {name: 'Luis Navarro', email:'luisnavarro@example.com'}
const roomTemplate = { name: 'Single Bed', rate: 145, discount: 15}

describe('Room isOccupied()', () => {
    const room = new Room({...roomTemplate})
    const booking1 = new Booking({...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room})
    room.bookings = [ booking1 ]
    test('available before', () => {
        expect(room.isOccupied('2023-12-25')).toBe(false)
    })
     test('available after', () => {
        expect(room.isOccupied('2024-01-10')).toBe(false)
    })
     test('available limit before', () => {
        expect(room.isOccupied('2024-01-01')).toBe(false)
    })
     test('available limit after', () => {
        expect(room.isOccupied('2024-01-07')).toBe(false)
    })
     test('available check out day', () => {
        expect(room.isOccupied('2024-01-06')).toBe(false)
    })
     test('occupied middle', () => {
        expect(room.isOccupied('2024-01-03')).toBe(true)
    })
     test('occupied first day', () => {
        expect(room.isOccupied('2024-01-02')).toBe(true)
    })
     test('occupied last day', () => {
        expect(room.isOccupied('2024-01-05')).toBe(true)
    })
})