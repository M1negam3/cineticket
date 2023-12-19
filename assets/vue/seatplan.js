
export default {
  props: {
    seatPlan: Array, // Array of seat data
  },
  methods: {
    toggleSeatAvailability(seat) {
      // Toggle seat availability logic
      seat.selected = !seat.selected;
    },
    confirmReservation() {
      // Reservation confirmation logic
      const selectedSeats = this.seatPlan
        .flatMap((row) => row.seats.filter((seat) => seat.selected))
        .map((seat) => seat.seatNumber);

      // Call a method to confirm the reservation with selectedSeats data
      // For example, this.$emit('confirm-reservation', selectedSeats);
    },
    

  },
  template: `
    <div>
    <div v-for="row in seatPlan" :key="row.rowNumber" class="seat-row">
      <div
        v-for="seat in row.seats"
        :key="seat.seatNumber"
        @click="toggleSeatAvailability(seat)"
        :class="{ 'selected': seat.selected, 'available': seat.available }"
        class="seat"
      >
        {{ seat.seatNumber }}
      </div>
    </div>
    <button @click="confirmReservation">Confirm Reservation</button>
  </div>`
};


<style>
/* Add styles for seats, selected seats, and available seats */
.seat {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  cursor: pointer;
}

.selected {
  background-color: #ffcccb; /* Selected seat color */
}

.available {
  background-color: #aaffaa; /* Available seat color */
}

.seat-row {
  margin-bottom: 10px;
}
</style>
