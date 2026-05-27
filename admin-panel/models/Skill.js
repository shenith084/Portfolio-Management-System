import mongoose from 'mongoose';

const SkillItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['Advanced', 'Intermediate', 'Beginner'],
      required: true,
    },
    pct: { type: Number, min: 0, max: 100, required: true },
  },
  { _id: false }
);

const SkillCategorySchema = new mongoose.Schema(
  {
    categoryTitle: {
      type: String,
      required: [true, 'Category title is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [SkillItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SkillCategory ||
  mongoose.model('SkillCategory', SkillCategorySchema);
