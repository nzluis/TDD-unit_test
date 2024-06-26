const { Booking, Room } = require('./index')

const roomTemplate = { name: 'Single Bed', rate: 145, discount: 15 }
const bookingTemplate = { name: 'Luis Navarro', email: 'luisnavarro@example.com', checkin: '2024-01-01', checkout: '2024-01-03', discount: 15, room: { ...roomTemplate } }

describe('Room is occupied', () => {
    const room = new Room({ ...roomTemplate })
    const booking1 = new Booking({ ...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room })
    room.bookings = [booking1]
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
    const room = new Room({ ...roomTemplate })
    const booking1 = new Booking({ ...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room })
    room.bookings = [booking1]
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
    test('endDate is previous startDate', () => {
        expect(() => room.occupancyPercentage('2024-01-05', '2024-01-01')).toThrow('StartDate > EndDate')
    })
})

describe('Total rooms percentage occupancy', () => {
    const room1 = new Room({ ...roomTemplate })
    const room2 = new Room({ ...roomTemplate, name: 'Double Bed' })
    const room3 = new Room({ ...roomTemplate, name: 'Suite' })
    const booking1 = new Booking({ ...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room: room1 })
    const booking2 = new Booking({ ...bookingTemplate, checkin: '2024-02-02', checkout: '2024-02-06', room: room1 })
    const booking3 = new Booking({ ...bookingTemplate, checkin: '2024-05-10', checkout: '2024-05-15', room: room1 })
    const booking4 = new Booking({ ...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room: room2 })
    const booking5 = new Booking({ ...bookingTemplate, checkin: '2024-02-06', checkout: '2024-02-10', room: room2 })
    const booking6 = new Booking({ ...bookingTemplate, checkin: '2024-05-20', checkout: '2024-05-25', room: room2 })
    const booking7 = new Booking({ ...bookingTemplate, checkin: '2024-05-05', checkout: '2024-05-12', room: room2 })
    room1.bookings = [booking1, booking2, booking3]
    room2.bookings = [booking4, booking5, booking6]
    room3.bookings = [booking1, booking6, booking7]
    const rooms = [room1, room2, room3]

    test('100% total occupancy', () => {
        expect(Room.totalOccupancyPercentage(rooms, '2024-01-02', '2024-01-05')).toBe(100)
    })
    test('50% total occupancy', () => {
        expect(Room.totalOccupancyPercentage(rooms, '2024-05-10', '2024-05-13')).toBe(50)
    })
    test('33% total occupancy', () => {
        expect(Room.totalOccupancyPercentage(rooms, '2024-02-02', '2024-02-06')).toBe(33)
    })
    test('0% total occupancy', () => {
        expect(Room.totalOccupancyPercentage(rooms, '2025-02-02', '2025-02-06')).toBe(0)
    })
})

describe(('Available rooms '), () => {
    const room1 = new Room({ ...roomTemplate })
    const room2 = new Room({ ...roomTemplate, name: 'Double Bed' })
    const room3 = new Room({ ...roomTemplate, name: 'Suite' })
    const booking1 = new Booking({ ...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room: room1 })
    const booking2 = new Booking({ ...bookingTemplate, checkin: '2024-02-02', checkout: '2024-02-06', room: room1 })
    const booking3 = new Booking({ ...bookingTemplate, checkin: '2024-05-10', checkout: '2024-05-15', room: room1 })
    const booking4 = new Booking({ ...bookingTemplate, checkin: '2024-01-05', checkout: '2024-01-10', room: room2 })
    const booking5 = new Booking({ ...bookingTemplate, checkin: '2024-02-06', checkout: '2024-02-10', room: room2 })
    const booking6 = new Booking({ ...bookingTemplate, checkin: '2024-05-20', checkout: '2024-05-25', room: room2 })
    const booking7 = new Booking({ ...bookingTemplate, checkin: '2024-05-05', checkout: '2024-05-12', room: room3 })
    const booking8 = new Booking({ ...bookingTemplate, checkin: '2024-01-02', checkout: '2024-01-06', room: room3 })
    const booking9 = new Booking({ ...bookingTemplate, checkin: '2024-05-20', checkout: '2024-05-25', room: room3 })
    room1.bookings = [booking1, booking2, booking3]
    room2.bookings = [booking4, booking5, booking6]
    room3.bookings = [booking8, booking9, booking7]
    const rooms = [room1, room2, room3]

    test('3 rooms full available', () => {
        expect(Room.availableRooms(rooms, '2024-01-15', '2024-01-20')).toHaveLength(3)
    })
    test("2 rooms available & third doesn't match ", () => {
        expect(Room.availableRooms(rooms, '2024-05-06', '2024-05-09')).toHaveLength(2)
    })
    test('2 rooms available & third match some days', () => {
        expect(Room.availableRooms(rooms, '2024-01-08', '2024-01-12')).toHaveLength(2)
    })
    test("1 room available & rest don't match", () => {
        expect(Room.availableRooms(rooms, '2024-01-02', '2024-01-04')).toHaveLength(1)
        expect(Room.availableRooms(rooms, '2024-01-02', '2024-01-04')[0].name).toBe('Double Bed')
    })
    test('1 room available & others match some days', () => {
        expect(Room.availableRooms(rooms, '2024-05-16', '2024-05-23')).toHaveLength(1)
        expect(Room.availableRooms(rooms, '2024-05-16', '2024-05-23')[0].name).toBe('Single Bed')
    })
    test('no rooms available - all out of range', () => {
        expect(Room.availableRooms(rooms, '2024-01-02', '2024-01-05')).toHaveLength(0)
    })
    test('no rooms available but match some days', () => {
        expect(Room.availableRooms(rooms, '2024-05-10', '2024-05-25')).toHaveLength(0)
    })
})

describe('Get Fee', () => {
    const room1 = new Room({ ...roomTemplate })
    const booking1 = new Booking({ ...bookingTemplate, room: room1 })
    test('Room rate 145$ for two days should be 20953 cents', () => {
        expect(booking1.getFee()).toBe(20953)
    })
    const booking7 = new Booking({ ...bookingTemplate, checkin: '2024-08-10', checkout: '2024-08-20' })
    test('Room rate 145$ for ten days should be 104763 cents', () => {
        expect(booking7.getFee()).toBe(104763)
    })
    const room2 = new Room({ ...roomTemplate, rate: 225, discount: 0 })
    const booking2 = new Booking({ ...bookingTemplate, room: room2 })
    test('Room rate 225$ --No Room Discount-- for two days should be 38250 cents ', () => {
        expect(booking2.getFee()).toBe(38250)
    })
    const room3 = new Room({ ...roomTemplate, rate: 225 })
    const booking3 = new Booking({ ...bookingTemplate, discount: 0, room: room3 })
    test('Room rate 225$ --No Booking Discount-- for two days should be 38250 cents ', () => {
        expect(booking3.getFee()).toBe(38250)
    })
    const room4 = new Room({ ...roomTemplate, rate: 225, discount: 0 })
    const booking4 = new Booking({ ...bookingTemplate, discount: 0, room: room4 })
    test('Room rate 225$ --No Discount-- for two days should be 45000 cents ', () => {
        expect(booking4.getFee()).toBe(45000)
    })
    const room5 = new Room({ ...roomTemplate, rate: 225, discount: 100 })
    const booking5 = new Booking({ ...bookingTemplate, room: room5 })
    test('Room rate with 100% discount should be 0 cents ', () => {
        expect(booking5.getFee()).toBe(0)
    })
    const room6 = new Room({ ...roomTemplate, rate: 225, discount: 101 })
    const booking6 = new Booking({ ...bookingTemplate, room: room6 })
    test('Room rate with crazy discount should throw an error ', () => {
        expect(() => booking6.getFee()).toThrow("Discount not allowed")
    })
})