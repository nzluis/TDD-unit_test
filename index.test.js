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

describe('Room percentage occupancy', () => {
    const room = new Room({...roomTemplate})
    const booking1 = new Booking({...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room})
    room.bookings = [ booking1 ]
    test('100% occupancy', () => {
        expect(room.occupancyPercentage('2024-01-02', '2024-01-05')).toBe(100)
    })
    test('0% occupancy forward', () => {
        expect(room.occupancyPercentage('2024-01-06', '2024-01-10')).toBe(0)
    })
    test('33% occupancy forward', () => {
        expect(room.occupancyPercentage('2024-01-04', '2024-01-09')).toBe(33)
    })
    test('66% occupancy forward', () => {
        expect(room.occupancyPercentage('2024-01-02', '2024-01-07')).toBe(66)
    })
    test('50% occupancy forward', () => {
        expect(room.occupancyPercentage('2024-01-04', '2024-01-07')).toBe(50)
    })
    test('0% occupancy backward', () => {
        expect(room.occupancyPercentage('2023-12-29', '2024-01-01')).toBe(0)
    })
    test('50% occupancy backward', () => {
        expect(room.occupancyPercentage('2023-12-31', '2024-01-03')).toBe(50)
    })
    test('startDate is previous endDate', () => {
        expect(room.occupancyPercentage('2024-01-05', '2024-01-01')).toBe(NaN)
    })
})
})