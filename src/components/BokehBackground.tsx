const BokehBackground = () => {
  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Bokeh particles */}
      <div className="bokeh-container">
        <div className="bokeh bokeh-1" />
        <div className="bokeh bokeh-2" />
        <div className="bokeh bokeh-3" />
      </div>
    </>
  );
};

export default BokehBackground;
