import joi from "joi";

// input validation middleware

const userSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export default validateUser;