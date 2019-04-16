import Joi from '@hapi/joi';

const joiText = Joi.string().min(3).max(50).required();
const joiLongText = Joi.string().min(3).max(500).required();
const joiArrayOfString = Joi.array().items(Joi.string());

const schema = Joi.object().keys({
  'nameId': joiText,
  'name': joiText,
  'description': joiLongText,
  'characteristics': Joi.array().required().items(Joi.object()),
  'activitySpaces': Joi.array().required().items(
    Joi.object().keys({
      'nameId': joiText,
      'name': joiText,
      'description': joiLongText,
      'activities': Joi.array().required().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'description': joiLongText,
          'completionCriterions': Joi.object().required().keys({
            'alphas': joiArrayOfString,
            'workProducts': joiArrayOfString,
          }),
          'entryCriterions': Joi.object().required().keys({
            'alphas': joiArrayOfString,
            'workProducts': joiArrayOfString,
          }),
          'competencies': joiArrayOfString,
        })
      ),
    }),
  ),
  'alphas': Joi.array().required().items(
    Joi.object().keys({
      'nameId': joiText,
      'name': joiText,
      'description': joiLongText,
      'workProducts': Joi.array().required().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'description': joiLongText,
          'levelOfDetails': joiArrayOfString,
        }),
      ),
      'states': Joi.array().required().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'description': joiLongText,
          'checklists': joiArrayOfString,
        }),
      ),
      'subalphaIds': joiArrayOfString,
    })
  ),
  'competencies': Joi.array().required().items(
    Joi.object().keys({
      'nameId': joiText,
      'name': joiText,
      'description': joiLongText,
      'levels': Joi.array().required().items(
        Joi.object().keys({
          'name': joiText,
          'description': joiLongText,
        }),
      ),
    }),
  ),
  'patterns': Joi.array().required().items(
    Joi.object().keys({
      'name': joiText,
      'nameId': joiText,
      'description': joiLongText,
      'alphas': joiArrayOfString,
      'activities': joiArrayOfString,
      'competencies': joiArrayOfString,
      'subpatternIds': joiArrayOfString,
    }),
  ),
});

export const isMethodChunkValid = (methodChunk) => {
  const result = Joi.validate(methodChunk, schema);
  const message = result.error && result.error.details[0].message;
  return message;
};
