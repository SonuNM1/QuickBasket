import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        default: ""
    },
    image: {
        type: String, 
        default: "", 
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const CateogryModel = mongoose.model('category', categorySchema);

export default CateogryModel;
