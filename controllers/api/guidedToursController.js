const Tour = require('../../model/GuidedTour');
const asyncHandler = require('express-async-handler')

const getAllTours = async (req, res) => {
    const tours = await Tour.find();
    if (!tours) return res.status(204).json({ 'message': 'No tours found' });
    res.json(tours);
}

const addTour = async (req,res) => { 
   const tours = new Tour({
        title: req.body.title,
        description: req.body.description,
        tourDate: req.body.tourDate,
        tourMeetingPoint: req.body.tourMeetingPoint,
        image: req.file?.filename
        
    });
    console.log("tours:", tours);
    tours.save()
    .then(data => {
        res.json(data);//response to Client
    })
    .catch(err => {
        res.json({message:err})
    })
};

const updateTour = asyncHandler(async (req, res) => {
    const { _id, title, description, date, tourDate, tourMeetingLocation } = req.body;

    if (!_id || !title ) {
        return res.status(400).json({ message: 'Id and Titel required.' })
    }
    
    const tour = await Tour.findOne({_id: req.body._id}).exec();
    if (!tour) {
        return res.status(400).json({ message: 'Tour not found' })
    }
   

try {
    tour.title = title;
    tour.description = description;
    tour.tourDate = tourDate;
    tour.tourMeetingLocation = tourMeetingLocation;
    
    let saveTour = await tour.save();
} catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
}
});

const deleteTour = async (req, res) => {
    if (!req?.params?.Id) return res.status(400).json({ 'message': 'Tour ID required.' });

    const tour = await Tour.findOne({ _id: req.params.Id }).exec();
    if (!tour) {
        return res.status(204).json({ "message": `No tour matches ID ${req.params.id}.` });
    }

    const result = await tour.deleteOne(); //{ _id: req.body.id }
    res.json("result");
}

const getTour = async (req, res) => {
    if (!req?.params?.id) 
    return res.status(400).json({ "message": 'Tour ID required' });
    const tour = await Tour.findOne({ _id: req.params.id }).exec();

    if (!tour) {
        return res.status(204).json({ 'message': `Tour ID ${req.params.id} not found` });
    }
    res.json(tour);
}


module.exports = {
    getAllTours,
    addTour,
    updateTour,
    deleteTour,
    getTour
}