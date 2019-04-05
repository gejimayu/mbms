import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const StringAndRequired = {
  type: String,
  required: true,
};

const StringRequiredUnique = {
  ...StringAndRequired,
  uniqute: true,
};

export const MethodChunkSchema = new Schema(
  {
    'nameId': StringAndRequired,
    'name': StringAndRequired,
    'description': StringAndRequired,
    'creator': StringAndRequired,
    'activitySpaces': [
      {
        'nameId': StringAndRequired,
        'name': StringAndRequired,
        'description': StringAndRequired,
        'activities': [
          {
            'nameId': StringRequiredUnique,
            'name': StringAndRequired,
            'description': StringAndRequired,
            'completionCriterions': {
              'alphas': [String],
              'workProducts': [String],
            },
            'entryCriterions': {
              'alphas': [String],
              'workProducts': [String],
            },
            'competencies': [String],
          },
        ],
      },
    ],
    'alphas': [
      {
        'nameId': StringRequiredUnique,
        'name': StringAndRequired,
        'description': StringAndRequired,
        'workProducts': [
          {
            'nameId': StringRequiredUnique,
            'name': StringAndRequired,
            'description': StringAndRequired,
            'levelOfDetails': [String],
          },
        ],
        'states': [
          {
            'nameId': StringRequiredUnique,
            'name': StringAndRequired,
            'description': StringAndRequired,
            'checklists': [String],
          },
        ],
        'subalphaIds': [String],
      },
    ],
    'competencies': [
      {
        'nameId': StringRequiredUnique,
        'name': StringAndRequired,
        'description': StringAndRequired,
        'levels': [
          {
            'name': StringAndRequired,
            'description': StringAndRequired,
          },
        ],
      },
    ],
    'patterns': [
      {
        'name': StringAndRequired,
        'nameId': StringRequiredUnique,
        'description': StringAndRequired,
        'alphas': [String],
        'activities': [String],
        'competencies': [String],
        'subpatternIds': [String],
      },
    ],
  },
  { collection: 'method-chunk' }
);

MethodChunkSchema.plugin(timestamps);

MethodChunkSchema.index({ nameId: 1 });

export default mongoose.model('MethodChunk', MethodChunkSchema);
