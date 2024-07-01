const Promotions = require("../models/promotions");

class promotionsController {
  // Get all promotions
  getAll(req, res, next) {
    Promotions.find({})
      .then((promotions) => res.status(200).json(promotions))
      .catch(next);
  }

  // Get a single promotion by ID
  getById(req, res, next) {
    Promotions.findById(req.params.id)
      .then((promotion) => {
        if (!promotion) {
          return res.status(404).json({ message: "Promotion not found" });
        }
        res.status(200).json(promotion);
      })
      .catch(next);
  }

  getByCode(req, res, next) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "'code' is required" });
    }
    const currentDate = new Date();

    Promotions.findOne({ code: code, status: true })
      .then((promotion) => {
        if (!promotion) {
          return res.status(404).json({ message: "Promotion not found" });
        }
        if (promotion.startDate >= currentDate) {
          return res
            .status(404)
            .json({ message: "Promotion not yet in effect" });
        }
        if (promotion.endDate <= currentDate) {
          return res.status(404).json({ message: "Promotion has expired" });
        }
        res.status(200).json(promotion);
      })
      .catch(next);
  }

  // Create a new promotion
  create(req, res, next) {
    const { name, code, percent, startDate, endDate } = req.body;

    // Check if all fields are provided
    if (!name || !code || !percent || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    // Check if 'name' or 'code' contains only whitespace
    if (/^\s*$/.test(name) || /^\s*$/.test(code)) {
      return res.status(400).json({
        message: "Name and code must not be empty",
      });
    }

    // Check if endDate is greater than startDate
    if (new Date(endDate) <= new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date must be greater than start date" });
    }

    // Check if 'code' contains whitespace
    if (/\s/.test(code)) {
      return res
        .status(400)
        .json({ message: "Code must not contain whitespace" });
    }

    // Check for duplicate name
    Promotions.findOne({ name })
      .then((existingName) => {
        if (existingName) {
          return res.status(400).json({ message: "Name already exists" });
        }

        // Check for duplicate code
        Promotions.findOne({ code })
          .then((existingCode) => {
            if (existingCode) {
              return res.status(400).json({ message: "Code already exists" });
            }

            const newPromotion = new Promotions({
              name,
              code,
              percent,
              startDate,
              endDate,
            });

            newPromotion
              .save()
              .then((promotion) => res.status(201).json(promotion))
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  // Update an existing promotion by id
  update(req, res, next) {
    const { id } = req.params;
    const { name, code, percent, startDate, endDate } = req.body;

    // Check if all fields are provided
    if (!name || !code || !percent || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    // Check if 'name' or 'code' contains only whitespace
    if (/^\s*$/.test(name) || /^\s*$/.test(code)) {
      return res.status(400).json({
        message: "Name and code must not be empty",
      });
    }

    // Check if endDate is greater than startDate
    if (new Date(endDate) <= new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date must be greater than start date" });
    }

    // Check if 'code' contains whitespace
    if (/\s/.test(code)) {
      return res
        .status(400)
        .json({ message: "Code must not contain whitespace" });
    }

    // Check for duplicate name
    Promotions.findOne({ name, _id: { $ne: id } })
      .then((existingName) => {
        if (existingName) {
          return res.status(400).json({ message: "Name already exists" });
        }

        // Check for duplicate code
        Promotions.findOne({ code, _id: { $ne: id } })
          .then((existingCode) => {
            if (existingCode) {
              return res.status(400).json({ message: "Code already exists" });
            }

            // Update the promotion
            Promotions.findByIdAndUpdate(
              id,
              { name, code, percent, startDate, endDate },
              { new: true }
            )
              .then((promotion) => {
                if (!promotion) {
                  return res
                    .status(404)
                    .json({ message: "Promotion not found" });
                }
                res.status(200).json(promotion);
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  // Update the status of an existing promotion by ID
  updateStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;

    // Check if 'status' is provided
    if (status === undefined) {
      return res
        .status(400)
        .json({ message: "'status' field must be provided" });
    }

    // Check if 'status' is a boolean
    if (typeof status !== "boolean") {
      return res
        .status(400)
        .json({ message: "'status' field must be a boolean" });
    }

    Promotions.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .then((promotion) => {
        if (!promotion) {
          return res.status(404).json({ message: "Promotion not found" });
        }
        res.status(200).json(promotion);
      })
      .catch(next);
  }

  // Delete a promotion by ID
  delete(req, res, next) {
    Promotions.findByIdAndDelete(req.params.id)
      .then((promotion) => {
        if (!promotion) {
          return res.status(404).json({ message: "Promotion not found" });
        }
        res.status(200).json({ message: "Promotion deleted successful!" });
      })
      .catch(next);
  }
}

module.exports = new promotionsController();
