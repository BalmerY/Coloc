const { getFlats, createFlat, deleteFlat, getFlat, updateFlat } = require('../queries/flat.queries');

exports.flatNew = (req, res, next) => 
{ res.render( 'flats/flat-form', { flat:{} , isAuthenticated: req.isAuthenticated(), currentUser: req.user }) };

exports.flatList = async (req, res, next) => 
{ try {  
  const userId = req.user._id
  const flats = await getFlats(userId);
        res.render('flats/flat', { flats , isAuthenticated: req.isAuthenticated(), currentUser: req.user });
     }
  catch(e) { next(e); }                   
};

exports.flatCreate = async (req, res, next) => 
{ try { const body = req.body;
        await createFlat({...body, author:req.user._id});
        res.redirect('/flats');
      }
  catch(e) { const errors = Object.keys(e.errors).map( key => e.errors[key].message );  
              res.status(400).render('flats/flat-form', {errors , isAuthenticated: req.isAuthenticated(), currentUser: req.user }); 
            }
};

exports.flatDelete = async (req, res, next) =>
{ try { const flatId = req.params.flatId;
        await deleteFlat(flatId);
        const flats = await getFlats(req.user._id);
        res.render('flats/flat-list', {flats});
      } 
  catch (e) { next(e); }
};

exports.flatEdit = async (req, res, next) =>
{ try {
    const flatId = req.params.flatId;
    const flat = await getFlat(flatId);
    res.render('flats/flat-form', {flat , isAuthenticated: req.isAuthenticated(), currentUser: req.user });
      } 
  catch (e) { next(e); }
};

exports.flatUpdate = async (req, res, next) => 
{ const flatId = req.params.flatId;
  try { const body = req.body;
        await updateFlat(flatId, body);
        res.redirect('/flats');
      }
  catch(e) { 
        const errors = Object.keys(e.errors).map( key => e.errors[key].message );  
        const flat = await getFlat(flatId)
        res.status(400).render('flats/flat-form', {errors, flat, isAuthenticated: req.isAuthenticated(), currentUser: req.user}); 
        next(e);
            }
};
