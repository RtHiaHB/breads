const mongoose = require('mongoose')

const breadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hasGluten: {
    type: Boolean,
    required: true
  },
  baker: {
    type: String,
    enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
  },
  image: {
    type: String, 
    default:'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg'
  }
})

breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}

breadSchema.statics.getBreadsBakedBy = function(bakerName) {
  return this.find({ baker: bakerName })
}

module.exports = mongoose.model('Bread', breadSchema)