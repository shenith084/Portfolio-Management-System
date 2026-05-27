import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Project date is required'],
      trim: true,
    },
    description: {
      type: [String],
      required: [true, 'At least one description bullet is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      trim: true,
      default: '#',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
